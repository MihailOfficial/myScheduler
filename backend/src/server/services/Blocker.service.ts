// Service to add a blocker with time conflict check
import { fetchUser } from "./User.service"
import Blocker from "../models/Blocker.model"

export const addBlocker = async (
	token: string,
	time: Date,
	duration: number,
	name?: string,
	description?: string,
	task?: string
) => {
	try {
		time = new Date(time)
		if (time < new Date()) {
			throw new Error("Cannot create a blocker in the past.")
		}
		const user = await fetchUser(token)
		const existingBlockers = await Blocker.find({ user: user._id })
		for (const existingBlocker of existingBlockers) {
			const start = existingBlocker.time
			const end = new Date(
				start.getTime() + existingBlocker.duration * 60 * 1000
			)
			checkConflict(start, end, time, duration)
		}

		if (duration <= 0) {
			throw new Error("The duration has to be postive.")
		}

		const newBlocker = new Blocker({
			time,
			duration,
			name: name || "new Blocker",
			description: description || "new Description",
			user: user._id,
			task: task || "",
		})
		await newBlocker.save()
		return newBlocker
	} catch (error) {
		throw error
	}
}

export const deleteBlocker = async (token: string, time: Date) => {
	try {
		const user = await fetchUser(token)
		const blocker = await Blocker.findOne({ user: user._id, time: time })
		if (!blocker) {
			throw new Error("Blocker not found")
		}
		await blocker.remove()
		return { message: "Blocker deleted successfully" }
	} catch (error) {
		throw error
	}
}

export async function getAllBlockers(token: string) {
	try {
		const user = await fetchUser(token)
		if (!user) {
			throw new Error("User not found")
		}

		const blockers = await Blocker.find({ user: user._id })

		return {
			message: "Blockers retrieved successfully",
			blockers,
		}
	} catch (error) {
		throw error
	}
}

export async function updateBlockerTime(
	token: string,
	oldTime: Date,
	newTime: Date
) {
	try {
		if (newTime < new Date()) {
			throw new Error("Cannot create a blocker in the past.")
		}

		const user = await fetchUser(token)
		if (!user) {
			throw new Error("User not found")
		}

		const existingBlocker = await Blocker.findOne({
			user: user._id,
			time: oldTime,
		})
		if (!existingBlocker) {
			throw new Error("Blocker not found")
		}

		const duration = existingBlocker.duration

		const existingBlockers = await Blocker.find({ user: user._id })

		for (const blocker of existingBlockers) {
			const start = blocker.time
			const end = new Date(start.getTime() + blocker.duration * 60 * 1000)
			if (oldTime.getTime() == start.getTime()) {
				continue
			}
			checkConflict(start, end, newTime, duration)
		}

		existingBlocker.time = newTime
		existingBlocker.save()
		return {
			message: "Blocker time updated successfully",
			existingBlocker,
		}
	} catch (error) {
		throw error
	}
}

export async function updateBlockerDuration(
	token: string,
	time: Date,
	newDuration: number
) {
	try {
		if (newDuration <= 0) {
			throw new Error("Duration must be positive")
		}
		const user = await fetchUser(token)
		if (!user) {
			throw new Error("User not found")
		}

		const existingBlocker = await Blocker.findOne({
			user: user._id,
			time: time,
		})
		if (!existingBlocker) {
			throw new Error("Blocker not found")
		}

		const existingBlockers = await Blocker.find({ user: user._id })

		for (const blocker of existingBlockers) {
			const start = blocker.time
			const end = new Date(start.getTime() + blocker.duration * 60 * 1000)
			if (time.getTime() == start.getTime()) {
				continue
			}
			checkConflict(start, end, time, newDuration)
		}

		existingBlocker.duration = newDuration
		existingBlocker.save()
		return {
			message: "Blocker duration updated successfully",
			existingBlocker,
		}
	} catch (error) {
		throw error
	}
}

const checkConflict = (
	start: Date,
	end: Date,
	time: Date,
	duration: number
) => {
	try {
		const newEnd = new Date(time.getTime() + duration * 60 * 1000)
		if (time >= start && time < end) {
			throw new Error(
				"Conflict with existing blocker, please choose a different time."
			)
		}
		if (newEnd > start && newEnd <= end) {
			throw new Error(
				"Conflict with existing blocker, please choose a different time."
			)
		}
		if (time <= start && newEnd >= end) {
			throw new Error(
				"Conflict with existing blocker, please choose a different time."
			)
		}
	} catch (error) {
		throw error
	}
}

export async function updateBlockerNameAndDescription(
	token: string,
	time: Date,
	name?: string,
	description?: string
) {
	try {
		const user = await fetchUser(token)
		if (!user) {
			throw new Error("User not found")
		}

		const existingBlocker = await Blocker.findOne({
			user: user._id,
			time: time,
		})
		if (!existingBlocker) {
			throw new Error("Blocker not found")
		}

		if (name) {
			existingBlocker.name = name
		}

		if (description) {
			existingBlocker.description = description
		}

		existingBlocker.save()

		return {
			message: "Blocker name and description updated successfully",
			existingBlocker,
		}
	} catch (error) {
		throw error
	}
}

export async function updateBlockerTask(
	token: string,
	time: Date,
	task: string
) {
	try {
		const blocker = await getByTime(token, time)
		blocker.task = task

		blocker.save()

		return {
			message: "Blocker name and description updated successfully",
			blocker,
		}
	} catch (error) {
		throw error
	}
}

export const getByTime = async (token: string, time: Date) => {
	try {
		const user = await fetchUser(token)
		if (!user) {
			throw new Error("User not found")
		}

		const existingBlocker = await Blocker.findOne({
			user: user._id,
			time: time,
		})
		if (!existingBlocker) {
			throw new Error("Blocker not found")
		}

		return existingBlocker
	} catch (error) {
		throw error
	}
}

export const getTaskId = async (token: string, time: Date) => {
	try {
		const blocker = await getByTime(token, time)

		return blocker.task
	} catch (error) {
		throw error
	}
}
