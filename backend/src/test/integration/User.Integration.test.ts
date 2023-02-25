// Import necessary modules and dependencies
import { expect } from "chai"
import { describe, it, beforeEach, afterEach } from "mocha"
import User from "../../server/models/User.model"
import sinon from "sinon"
import supertest from "supertest"
import app from "../../server/index"

// Define a test suite for the "POST /api/user/signUp" route
describe("POST /api/user/signUp", () => {
	// Declare a variable to hold a sinon stub for the User.save() method
	let createUserStub

	// Run this function before each test to set up the stub
	beforeEach(() => {
		createUserStub = sinon.stub(User.prototype, "save")
	})

	// Run this function after each test to restore the stub
	afterEach(() => {
		createUserStub.restore()
	})

	// Define a test case for successful signup
	it("should create a new user with valid input", (done) => {
		// Set up variables for user attributes
		const email = "testuser@example.com"
		const username = "testuser"
		const password = "Testpassword123"

		// Set up the mock response from User.save()
		createUserStub.resolves({
			_id: "6140baf2f6d68d6c748fa6e1",
			email,
			username,
			password,
		})

		// Make the request to create a new user
		supertest(app)
			.post("/api/user/signUp")
			.send({ email, username, password })
			.expect(201)
			.end((err, res) => {
				if (err) return done(err)
				expect(res.body).to.have.property("user")
				expect(res.body.user).to.have.property("email", email)
				expect(res.body.user).to.have.property("username", username)
				done()
			})
	})

	// Define a test case for when a user with an existing email tries to sign up
	it("should fail to create a user with an existing email", (done) => {
		// Set up the mock response from User.save()
		const error = new Error("Email already exists") as any
		error.name = "MongoError"
		error.code = 11000
		createUserStub.rejects(error)

		// Make a POST request to the sign-up route with the existing email address
		supertest(app)
			.post("/api/user/signUp")
			.send({
				email: "testuser@example.com",
				username: "testuser",
				password: "Testpassword123",
			})
			.expect(400) // Expect the response status code to be 400
			.end((err, res) => {
				// If there's an error, pass it to the done() function to fail the test
				if (err) return done(err)

				// Assert that the response body contains the expected error message
				expect(res.body.error).to.equal("Email already exists")
				done()
			})
	})
})
