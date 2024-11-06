import mongoose from 'mongoose';
import { User } from './models/user.js';
import { FreelancerProfile } from './models/freeLancerProfile.js';
import { Project } from './models/project.js';
import { Bid } from './models/bid.js';
import { Notification } from './models/notification.js';

// Test data for each model
const testData = {
  user: {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'Password@123',
    role: 'freelancer'
  },
  freelancerProfile: {
    description: 'Experienced full-stack developer.',
    skills: ['JavaScript', 'Node.js', 'React'],
    hourlyRate: 50
  },
  project: {
    title: 'Website Development',
    description: 'A project to develop a corporate website.',
    budget: 1000
  },
  bid: {
    bidAmount: 950,
    proposal: 'I have the skills and experience to complete this project on time and within budget.'
  },
  notification: {
    message: 'Your bid has been accepted!'
  }
};

// Test function for creating documents
export async function createTestDocuments() {
  try {
    // Create a User document
    const user = new User(testData.user);
    await user.save();
    console.log('User created successfully:', user);

    // Create a FreelancerProfile document linked to the created user
    const freelancerProfile = new FreelancerProfile({
      ...testData.freelancerProfile,
      userId: user._id
    });
    await freelancerProfile.save();
    console.log('Freelancer Profile created successfully:', freelancerProfile);

    // Create a Project document linked to the user (as the client)
    const project = new Project({
      ...testData.project,
      clientId: user._id
    });
    await project.save();
    console.log('Project created successfully:', project);

    // Create a Bid document linked to the project and freelancer user
    const bid = new Bid({
      ...testData.bid,
      projectId: project._id,
      freelancerId: user._id
    });
    await bid.save();
    console.log('Bid created successfully:', bid);

    // Create a Notification document linked to the user
    const notification = new Notification({
      ...testData.notification,
      userId: user._id
    });
    await notification.save();
    console.log('Notification created successfully:', notification);
  } catch (error) {
    console.error('Error creating documents:', error.message);
  } finally {
    mongoose.connection.close(); // Close connection after testing
  }
}
