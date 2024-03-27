import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-400 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-3xl font-semibold">Blog and Golb</h2>
        <p className="text-gray-500 my-2">What is Blog? Check This!</p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          Check It Out!
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://images.yourstory.com/cs/wordpress/2017/02/52-Blog.jpg"
          alt=""
        />
      </div>
    </div>
  );
}
