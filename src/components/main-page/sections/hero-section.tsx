export default function HeroSection() {
  return (
    <section className='w-full h-[450px] flex justify-center relative banner-bg'>
      <div className='w-full h-full inset-0 bg-black/10 absolute'></div>
      <div className='w-[1080px] h-full flex flex-col justify-center items-center text-shadow-style relative'>
        <div className='flex flex-col gap-[20px] absolute top-[130px] left-0'>
          <p className='flex gap-[20px] items-center'>
            <span className='title-b-32'>한양대학교 ERICA</span>
            <span className='title-b-24'>융합산업대학원</span>
          </p>
          <h2 className='flex flex-col font-bold'>
            <span className='text-[52px]'>미술치료학과</span>
            <span className='text-[32px]'>DEPARTMENT OF ART THERAPY</span>
          </h2>
        </div>
        <p className='w-[700px] text-[16px] text-right absolute bottom-[40px] right-0'>
          미술작품을 활용한 전문적인 미술치료전문가 양성, 심리치료의 도구로
          이미지와 창조가 반영되는 미술활동과 미술작품을 활용하여 인격의 통합과
          재통합을 돕는 미술치료전문가를 양성합니다.
        </p>
      </div>
    </section>
  );
}
