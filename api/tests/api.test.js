import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { fetchData } from '../index'; 

vi.mock('axios');

describe('fetchData', () => {
  it('should fetch data successfully', async () => {
    const mockedResponse = { data: { message: 'Success' } };
    axios.get.mockResolvedValueOnce(mockedResponse);

    const result = await fetchData();

    expect(result.data.message).toBe('Success');
    expect(axios.get).toHaveBeenCalledWith('https://api.example.com/data');
  });

  it('should handle API error', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    try {
      await fetchData();
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });
});

describe('API Test', () => {
  it('should pass this test', () => {
    expect(1 + 1).toBe(2);
  });
});