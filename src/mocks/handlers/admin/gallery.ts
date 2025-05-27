import { ADMIN_GALLERIES_MOCK_DATA } from '@/constants/admin/gallery';
import { http, HttpResponse } from 'msw';

const API_URL = import.meta.env.VITE_API_URL;

export const adminGalleryHandlers = [
  // [POST] 전시회 등록
  http.post(
    `${API_URL}/admin/galleries`,
    async ({ request }: { request: Request }) => {
      const { title, startDate, endDate } = await request.json();

      return HttpResponse.json({
        galleriesNo: 1,
        title,
        startDate,
        endDate,
      });
    }
  ),

  // [GET] 전시회 전체 조회
  http.get(`${API_URL}/admin/galleries`, async () => {
    return HttpResponse.json({
      galleries: ADMIN_GALLERIES_MOCK_DATA,
    });
  }),

  // [GET] 전시회 상세 조회
  http.get(
    `${API_URL}/admin/galleries/:galleriesNo`,
    async ({ request }: { request: Request }) => {
      const { galleriesNo } = await request.json();

      return HttpResponse.json({
        galleries: ADMIN_GALLERIES_MOCK_DATA.find(
          (gallery) => gallery.galleriesNo === galleriesNo
        ),
      });
    }
  ),

  // [PATCH] 전시회 정보 수정
  http.patch(
    `${API_URL}/admin/galleries/:galleriesNo`,
    async ({ request }: { request: Request }) => {
      const { galleriesNo, title, startDate, endDate } = await request.json();

      return HttpResponse.json({
        galleriesNo,
        title,
        startDate,
        endDate,
      });
    }
  ),

  // [DELETE] 전시회 삭제
  http.delete(
    `${API_URL}/admin/galleries/:galleriesNo`,
    async ({ request }: { request: Request }) => {
      const { galleriesNo } = await request.json();

      if (!galleriesNo) {
        return HttpResponse.json(
          {
            message: '해당 전시회가 존재하지 않습니다.',
          },
          { status: 404 }
        );
      }
    }
  ),
];
