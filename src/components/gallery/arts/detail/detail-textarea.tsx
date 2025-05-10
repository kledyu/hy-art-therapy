import { ChangeEvent, FormEvent } from 'react';
import { Image, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DetailTextareaProps {
  comment: string;
  onCommentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCommentSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function DetailTextarea({
  comment,
  onCommentChange,
  onImageChange,
  onCommentSubmit,
}: DetailTextareaProps) {
  const handleImageButtonClick = () => {
    document.getElementById('imageInput')?.click(); // 파일 input 클릭 이벤트 트리거
  };

  return (
    <form onSubmit={onCommentSubmit} className='flex-1 flex flex-col gap-4'>
      <textarea
        name='reviewText'
        id='reviewText'
        placeholder='감상평을 작성해주세요.'
        value={comment}
        onChange={onCommentChange}
        className='w-full h-[150px] border border-[var(--gray)] px-3 py-2 text-sm focus:outline-none focus:ring-0'
      />
      <div className='py-[20px] flex justify-end flex-wrap gap-[20px]'>
        <Button
          type='button'
          className='inline-flex items-center gap-2 text-xs font-bold text-white bg-[var(--primary)] px-4 py-2 rounded-full'
          onClick={handleImageButtonClick}>
          이미지 첨부
          <Image size={16} color='#fff' />
        </Button>
        <input
          id='imageInput'
          type='file'
          hidden
          accept='image/*'
          onChange={onImageChange}
        />
        <Button
          type='submit'
          className='inline-flex items-center gap-2 text-xs font-bold text-white bg-[var(--primary)] px-4 py-2 rounded-full'>
          댓글 업로드
          <Navigation size={16} color='#fff' />
        </Button>
      </div>
    </form>
  );
}
