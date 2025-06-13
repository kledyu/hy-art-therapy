import FormField from '@/components/admin/form-field';
import { Button } from '@/components/ui/button';
import { postArtist } from '@/apis/admin/artists';
import { ArtistsResponse, PostArtistRequest } from '@/types/admin/artists';
import { Artist, InfiniteScrollResponse } from '@/types';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';
import { handleApiError } from '@/components/common/error-handler';

type Props = {
  setArtistsList: Dispatch<
    SetStateAction<InfiniteScrollResponse<ArtistsResponse>>
  >;
};

export default function ArtistForm({ setArtistsList }: Props) {
  const [form, setForm] = useState<Omit<Artist, 'artistNo'>>({
    artistName: '',
    studentNo: 0,
    cohort: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value.replace(/\s+/g, ''), // 모든 공백 허용 안 함
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!form.artistName || !form.studentNo || !form.cohort) {
      toast.error('이름, 학번, 기수 모두 입력해주세요.');
      return;
    }
    if (form.artistName.length < 2 || form.artistName.length > 50) {
      toast.error('이름은 2자 이상 50자 이하로 입력해주세요.');
      return;
    }
    if (isNaN(form.studentNo)) {
      toast.error('학번은 숫자만 입력이 가능합니다.');
      return;
    }
    if (String(form.studentNo).length !== 10) {
      toast.error('학번은 10자리 숫자만 입력이 가능합니다.');
      return;
    }
    if (/^0+$/.test(String(form.cohort))) {
      toast.error('학번은 0으로만 구성될 수 없습니다.');
      return;
    }
    if (isNaN(form.cohort)) {
      toast.error('기수는 숫자만 입력이 가능합니다.');
      return;
    }
    if (/^0+$/.test(String(form.cohort))) {
      toast.error('기수는 0으로만 구성될 수 없습니다.');
      return;
    }

    try {
      const res = await postArtist(form);
      toast.success(res.message);

      setForm({ artistName: '', studentNo: 0, cohort: 0 });

      setArtistsList((prev) => {
        return { ...prev, form };
      });
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const fields = [
    { id: 'artistName', label: '이름' },
    { id: 'studentNo', label: '학번' },
    { id: 'cohort', label: '기수' },
  ];

  return (
    <form className='flex flex-col gap-[30px]' onSubmit={handleSubmit}>
      <div className='border border-btn-gray-d rounded overflow-hidden divide-y divide-btn-gray-d'>
        {fields.map(({ id, label }) => (
          <FormField key={id} id={id} label={label}>
            <input
              id={id}
              name={id}
              value={
                typeof form[id as keyof PostArtistRequest] === 'number' &&
                form[id as keyof PostArtistRequest] === 0
                  ? ''
                  : form[id as keyof PostArtistRequest] ?? ''
              }
              onChange={handleChange}
              autoComplete='off'
              className='w-full px-[20px] outline-none cursor-pointer'
            />
          </FormField>
        ))}
      </div>
      <Button type='submit' className='ml-auto'>
        작가 등록
      </Button>
    </form>
  );
}
