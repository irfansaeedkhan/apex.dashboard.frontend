import React from "react";

const EmailSentPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-center font-bai-jamjuree text-xl font-semibold leading-normal text-blue-shade-1 md:text-[34px]">
        Activation Link Sent to Your Email
      </h2>
      <p className="font-inter text-center text-sm font-medium text-gray-shade-1 md:text-base">
        Complete your registration with ease by clicking on the activation link
        in your inbox.{" "}
      </p>
    </div>
  );
};

export default EmailSentPage;
