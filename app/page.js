import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className=" w-full h-[40vh] sm:h-[50vh] flex flex-col justify-center items-center gap-4">
        <div className=" font-bold text-3xl sm:text-4xl flex justify-center items-center">
          Buy Ma A Chai
          <span><img className=" invertTea h-16 sm:h-24 w-8 sm:w-10" src="/tea.gif" alt="tea-gif" /></span>
        </div>
        <p className=" text-center">A crowdfunding platform for creators. Get funded by your fans and followers.start now!</p>

        <div className=" flex items-center">
          <Link href={'/login'}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Start Here
            </button>
          </Link>
          <Link href={'/about'}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Read more
            </button>
          </Link>
        </div>
      </div>

      <div className=" h-1 bg-white opacity-10"></div>

      <div className="w-full h-[40vh] flex flex-col gap-10 justify-center items-center ">
        <h2 className=" text-xl sm:text-2xl font-semibold">Your Fans can Buy You a Chai</h2>

        <div className=" w-full flex items-center justify-around">
          <div className=" flex flex-col items-center gap-1">
            <div className=" rounded-full relative w-[60px] sm:w-[120px] h-[60px] sm:h-[120px] p-2">
              <Image className=" rounded-full" src="/man (1).gif" alt="man-gif" fill />
            </div>
            <span className=" font-medium text-center">Collect Funds</span>
            <p className=" font-thin text-xs sm:text-sm text-center">You can collect Funds</p>
          </div>

          <div className=" flex flex-col items-center gap-1">
            <div className="rounded-full relative w-[60px] sm:w-[120px] h-[60px] sm:h-[120px] p-2">
              <Image className=" rounded-full" src="/dollar.gif" alt="con-gif" fill />
            </div>
            <span className=" font-medium text-center">Fund Yourself</span>
            <p className=" font-thin text-xs sm:text-sm text-center">Can fund yourself too</p>
          </div>

          <div className=" flex flex-col items-center gap-1">
            <div className=" rounded-full relative w-[60px] sm:w-[120px] h-[60px] sm:h-[120px] p-2">
              <Image className=" rounded-full" src="/group (1).gif" alt="man-gif" fill />
            </div>
            <span className=" font-medium text-center">Fans wants to help you</span>
            <p className=" font-thin text-xs sm:text-sm text-center">Your fans are available to help you</p>
          </div>
        </div>
      </div>

      <div className=" h-1 bg-white opacity-10"></div>

      <div className="w-full h-full flex flex-col gap-10 justify-center items-center pb-10">
        <h2 className=" text-2xl font-semibold">Learn More About Us</h2>
        <div className="w-[90%] h-[30vh] md:w-[50%] md:h-[50vh] lg:w-[50%] lg:h-[60vh] xl:w-[50%] xl:h-[60vh]">
          <iframe className="w-full h-full" src="https://www.youtube.com/embed/QtaorVNAwbI?si=lgyXhLSl7h7aI-7Z" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
      </div>
    </>
  );
}
