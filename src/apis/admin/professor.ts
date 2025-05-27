import apiInstance from '@/lib/axios';
import type { MessageResponse, Professor } from '@/types';
import type {
  PostProfessorRequest,
  ProfessorResponse,
  PatchProfessorRequest,
} from '@/types/admin/professor';

export const postProfessor = async ({
  professorName,
  position,
  major,
  email,
  tel,
  filesNo,
}: PostProfessorRequest): Promise<ProfessorResponse> => {
  const response = await apiInstance.post('/admin/professors', {
    professorName,
    position,
    major,
    email,
    tel,
    filesNo,
  });

  return response.data;
};

export const getProfessors = async (): Promise<ProfessorResponse[]> => {
  const response = await apiInstance.get('/admin/professors');

  return response.data;
};

export const getProfessor = async (
  professorNo: number
): Promise<ProfessorResponse> => {
  const response = await apiInstance.get(`/admin/professors/${professorNo}`);

  return response.data;
};

export const patchProfessor = async ({
  professorNo,
  professorName,
  position,
  major,
  email,
  tel,
  filesNo,
}: PatchProfessorRequest): Promise<ProfessorResponse> => {
  const response = await apiInstance.patch(`/admin/professors/${professorNo}`, {
    professorName,
    position,
    major,
    email,
    tel,
    filesNo,
  });

  return response.data;
};

export const deleteProfessor = async ({
  professorNo,
}: Pick<Professor, 'professorNo'>): Promise<MessageResponse> => {
  const response = await apiInstance.delete(`/admin/professors/${professorNo}`);

  return response.data;
};
