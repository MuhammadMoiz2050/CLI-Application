import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import axios from 'axios'; 
import MockAdapter from 'axios-mock-adapter'; // Import Axios Mock Adapter
import Cli from '../src/components/cli';

describe('User Inputs', () => {
  let mockAxios;

  beforeAll(() => {
    mockAxios = new MockAdapter(axios); // Create a new instance of Axios Mock Adapter
  });

  afterAll(() => {
    mockAxios.restore(); // Restore mock after all tests
  });

  it('should handle invalid input commands', async () => {
    render(<Cli />);

    // Simulate entering an invalid command
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'invalid-command' } });

    // Press Enter key to execute the command
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    // Mock a failed Axios request (replace this with your actual error response)
    mockAxios.onPost('http://localhost:3001/upload').reply(400, { message: 'Invalid command' });

    // Ensure the error message is displayed
    const errorMessage = await screen.findByText('Invalid command, Use "help" to see the command list.');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should handle valid input commands', async () => {
    render(<Cli />);

    // Simulate entering a valid command
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'help' } });

    // Press Enter key to execute the command
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    // Mock a successful Axios request (replace this with your actual success response)
    mockAxios.onPost('http://localhost:3001/upload').reply(200, { message: 'File uploaded successfully' });

    // Ensure the help message is displayed
    const helpMessage = await screen.findByText('Available commands:');
    expect(helpMessage).toBeInTheDocument();
  });

  // Add more test cases to cover other input scenarios
});