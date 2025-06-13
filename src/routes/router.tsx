import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import lazyElement from '@/components/common/lazy-element';
import MainSkeleton from '@/components/main/main-skeleton';
import { AuthLayout, IntroLayout, MyPageLayout, RootLayout } from '@/layouts';
import CommingSoon from '@/pages/comming-soon/page';
import NotFoundPage from '@/pages/not-found/page';
import { rootLoader } from '@/routes/loaders/root-loader';
import { adminArtistLoader } from './loaders/admin/artists';
import { adminArtsLoader } from './loaders/admin/arts-loader';
import { adminUserLoader } from './loaders/admin/users';
import { artLoader } from '@/routes/loaders/art/art-loader';
import { galleryLoader } from '@/routes/loaders/gallery/gallery-loader';
import {
  myProfileLoader,
  myPostsLoader,
  myReviewsLoader,
} from '@/routes/loaders/my-page';

// LAZY LOADING
const HomePage = lazy(() => import('@/pages/page'));
const GalleryPage = lazy(() => import('@/pages/gallery/page'));
const ArtsDetailPage = lazy(() => import('@/pages/gallery/[arts-no]/page'));
const FindMyPage = lazy(() => import('@/pages/(auth)/find-my/page'));
const SignInPage = lazy(() => import('@/pages/(auth)/sign-in/page'));
const SignUpPage = lazy(() => import('@/pages/(auth)/sign-up/page'));
const ResetPwPage = lazy(() => import('@/pages/my-page/reset-pw/page'));
const MyPageReviews = lazy(() => import('@/pages/my-page/reviews/page'));
const MyPagePosts = lazy(() => import('@/pages/my-page/posts/page'));
const MyPageProfile = lazy(() => import('@/pages/my-page/profile/page'));

// 학과소개
const IntroPage = lazy(() => import('@/pages/intro/page'));
const VisionPage = lazy(() => import('@/pages/intro/vision/page'));
const ProfessorsPage = lazy(() => import('@/pages/intro/professors/page'));
const CertificatesPage = lazy(() => import('@/pages/intro/certificates/page'));
const CurriculumsPage = lazy(() => import('@/pages/intro/curriculums/page'));
const MapPage = lazy(() => import('@/pages/intro/map/page'));
const ProspectPage = lazy(() => import('@/pages/intro/prospect/page'));
const MouPage = lazy(() => import('@/pages/intro/mou/page'));

// 임상치료
const ClinicalPage = lazy(() => import('@/pages/clinical/page'));
const DevelopmentalPage = lazy(
  () => import('@/pages/clinical/developmental/page')
);
const InfantPage = lazy(() => import('@/pages/clinical/infant/page'));
const ChildrenPage = lazy(() => import('@/pages/clinical/children/page'));
const AdolescentPage = lazy(() => import('@/pages/clinical/adolescent/page'));
const AdultPage = lazy(() => import('@/pages/clinical/adult/page'));
const PreventionPage = lazy(() => import('@/pages/clinical/prevention/page'));

// 입학안내
const FreshmanPage = lazy(() => import('@/pages/enroll/freshman/page'));
const ScholarshipPage = lazy(() => import('@/pages/enroll/scholarship/page'));

// 공지사항
const NoticePage = lazy(() => import('@/pages/notice/page'));
const NoticeDetailPage = lazy(() => import('@/pages/notice/detail/page'));
const NoticeWritePage = lazy(() => import('@/pages/notice/write/page'));

// 관리자
const AdminPage = lazy(() => import('@/pages/admin/page'));
const AdminUsersPage = lazy(() => import('@/pages/admin/users/page'));
const AdminArtPage = lazy(() => import('@/pages/admin/arts/page'));
const AdminArtistPage = lazy(() => import('@/pages/admin/artists/page'));
const AdminGalleryPage = lazy(() => import('@/pages/admin/galleries/page'));
const AdminProfessorPage = lazy(() => import('@/pages/admin/professors/page'));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    loader: rootLoader,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<MainSkeleton />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: '/gallery',
        element: lazyElement(GalleryPage),
        loader: galleryLoader,
      },
      {
        path: '/gallery/:artsNo',
        element: lazyElement(ArtsDetailPage),
        loader: artLoader,
      },

      {
        path: '/clinical',
        children: [
          {
            path: '',
            element: lazyElement(ClinicalPage),
          },
          {
            path: 'developmental',
            element: lazyElement(DevelopmentalPage),
          },
          {
            path: 'infant',
            element: lazyElement(InfantPage),
          },
          {
            path: 'children',
            element: lazyElement(ChildrenPage),
          },
          {
            path: 'adolescent',
            element: lazyElement(AdolescentPage),
          },
          {
            path: 'adult',
            element: lazyElement(AdultPage),
          },
          {
            path: 'prevention',
            element: lazyElement(PreventionPage),
          },
        ],
      },
      {
        path: '/enroll',
        children: [
          {
            path: 'freshman',
            element: lazyElement(FreshmanPage),
          },
          {
            path: 'scholarship',
            element: lazyElement(ScholarshipPage),
          },
        ],
      },
      {
        path: '/notice',
        element: lazyElement(NoticePage),
      },
      {
        path: 'notice/:noticeNo',
        element: lazyElement(NoticeDetailPage),
      },
      {
        path: 'notice/write',
        element: lazyElement(NoticeWritePage),
      },
      {
        path: '/comming-soon',
        element: <CommingSoon />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
      {
        path: '/admin',
        element: lazyElement(AdminPage),
        children: [
          {
            path: 'users',
            element: lazyElement(AdminUsersPage),
            loader: adminUserLoader,
          },
          {
            path: 'arts',
            element: lazyElement(AdminArtPage),
            loader: adminArtsLoader,
          },
          {
            path: 'artists',
            element: lazyElement(AdminArtistPage),
            loader: adminArtistLoader,
          },
          { path: 'galleries', element: lazyElement(AdminGalleryPage) },
          { path: 'professors', element: lazyElement(AdminProfessorPage) },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: lazyElement(SignInPage),
      },
      {
        path: '/sign-up',
        element: lazyElement(SignUpPage),
      },
      {
        path: '/find-my',
        element: lazyElement(FindMyPage),
      },
    ],
  },
  {
    element: <MyPageLayout />,
    children: [
      {
        path: '/my-page',
        children: [
          {
            path: 'reviews',
            element: lazyElement(MyPageReviews),
            loader: myReviewsLoader,
          },
          {
            path: 'posts',
            element: lazyElement(MyPagePosts),
            loader: myPostsLoader,
          },
          {
            path: 'profile',
            children: [
              {
                path: '',
                element: lazyElement(MyPageProfile),
                loader: myProfileLoader,
              },
              {
                path: 'reset-pw',
                element: lazyElement(ResetPwPage),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <IntroLayout />,
    children: [
      {
        path: '/intro',
        children: [
          {
            path: '',
            element: lazyElement(IntroPage),
          },
          {
            path: 'vision',
            element: lazyElement(VisionPage),
          },
          {
            path: 'professors',
            element: lazyElement(ProfessorsPage),
          },
          {
            path: 'curriculums',
            element: lazyElement(CurriculumsPage),
          },
          {
            path: 'certificates',
            element: lazyElement(CertificatesPage),
          },
          {
            path: 'prospect',
            element: lazyElement(ProspectPage),
          },
          {
            path: 'mou',
            element: lazyElement(MouPage),
          },
          {
            path: 'map',
            element: lazyElement(MapPage),
          },
        ],
      },
    ],
  },
]);

export default router;
