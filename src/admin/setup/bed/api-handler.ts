import AxiosClient from "@/api/apiClient";
import { z } from "zod";
import { SetupFloorSchema } from "./floor/bed-floors";
import { SetupBedGroupsSchema } from "./group/bed-groups";
import { SetupBedSchema } from "./bed-name/bed";
import { PaginatedBedType } from "@/types/setupTypes/bedTypes";
import { Params } from "@/types/type";


export const createBedFloor = async (
  formData: z.infer<typeof SetupFloorSchema>
) => {
  try {
    const res = await AxiosClient.post(`/api/setupBed/floor`, formData);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const getBedFloors = async () => {
  try {
    const res = await AxiosClient.get(`/api/setupBed/floor`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const deleteBedFloor = async (id: number) => {
  try {
    const res = await AxiosClient.delete(`/api/setupBed/floor/${id}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

// bed group
export const createBedGroup = async (
  formData: z.infer<typeof SetupBedGroupsSchema>
) => {
  try {
    const res = await AxiosClient.post(`/api/setupBed/group`, formData);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};


export const updateBedGroup = async (
  id: number,
  formData: z.infer<typeof SetupBedGroupsSchema>
) => {
  try {
    const res = await AxiosClient.put(`/api/setupBed/group/${id}`, formData);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const getBedGroups = async () => {
  try {
    const res = await AxiosClient.get(`/api/setupBed/group`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const deleteBedGroup = async (id: number) => {
  try {
    const res = await AxiosClient.delete(`/api/setupBed/group/${id}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const getBedGroupDetails = async (id: number) => {
  try {
    const res = await AxiosClient.get(`/api/setupBed/group/${id}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};


// Setup Bed

export const createBed = async (
  formData: z.infer<typeof SetupBedSchema>
) => {
  try {
    const res = await AxiosClient.post(`/api/setupBed/bed`, formData);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const updateBed = async <T extends {}>(
  id: number,
  formData: T
) => {
  try {
    const res = await AxiosClient.put(`/api/setupBed/bed/${id}`, formData);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const getBeds = async (params?: Params): Promise<PaginatedBedType> => {
  try {
    const res = await AxiosClient.get(`/api/setupBed/bed`, { params });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const deleteBed = async (id: number) => {
  try {
    const res = await AxiosClient.delete(`/api/setupBed/bed/${id}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

