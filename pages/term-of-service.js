import Image from 'next/image';
import { LandingPageLayout } from '@/components/layouts';

export default function TermOfService() {
  return (
    <LandingPageLayout>
      {/* Hero */}
      <div className="relative flex flex-col items-center px-5 pb-[10px] pt-5 md:flex-row lg:px-0 lg:pt-[60px]">
        <div className="absolute right-0 top-0 hidden h-[100%] w-[27%] bg-c-red-50 md:block"></div>
        <div className="mb-10 lg:ml-[10%] lg:w-5/12">
          <h1 className="text-2xl font-bold leading-[81px] text-c-red-600 lg:text-[54px]">
            Term of Service
          </h1>
          <p className="text-[20px] font-bold">
            Read our terms below to learn more about your rights and responsibilities as an user.
          </p>
        </div>
        <div className="relative h-[325px] w-full lg:h-[425px] lg:w-7/12">
          <Image
            alt="privacy policy"
            src="/images/aggrement/terms-of-service.png"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto mb-[50px] mt-5 flex max-w-[655px] flex-col gap-y-[40px] px-5 lg:mt-[70px] lg:px-0">
        <p>
          Welcome to Kalkula-DataWatch! These Terms of Service outline the terms and conditions for
          your use of our application. By accessing or using Kalkula-DataWatch, you agree to comply
          with these terms. If you do not agree with any part of these terms, please refrain from
          using our app.
        </p>
        <div>
          <h2 className="mb-4 text-lg font-bold">Account Registration:</h2>
          <ol className="ml-4 flex list-decimal flex-col gap-3">
            <li>You must create an account to access certain features of the app.</li>
            <li>
              You are responsible for maintaining the confidentiality of your account information
              and for all activities that occur under your account.
            </li>
          </ol>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold">Acceptable Use:</h2>
          <ol className="ml-4 flex list-decimal flex-col gap-3">
            <li>
              You agree to use Kalkula-DataWatch in compliance with all applicable laws and
              regulations.
            </li>
            <li>
              You shall not engage in any activity that may disrupt or interfere with the
              functioning of the app or infringe upon the rights of others.
            </li>
          </ol>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold">Intellectual Property:</h2>
          <ol className="ml-4 flex list-decimal flex-col gap-3">
            <li>
              All intellectual property rights related to Kalkula-DataWatch, including but not
              limited to trademarks, copyrights, and patents, are owned by Kedata Indonesia Digital
              or its licensors.
            </li>
            <li>
              You may not copy, modify, distribute, or reproduce any part of the app without prior
              written permission.
            </li>
          </ol>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold">User Content:</h2>
          <ol className="ml-4 flex list-decimal flex-col gap-3">
            <li>
              By using Kalkula-DataWatch, you may connect or upload content, including text, files,
              and media.
            </li>
            <li>
              You retain ownership of your content, but you grant Kedata Indonesia Digital a
              non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and
              distribute your content within the app.
            </li>
          </ol>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold">Limitation of Liability:</h2>
          <ol className="ml-4 flex list-decimal flex-col gap-3">
            <li>
              Kedata Indonesia Digital shall not be liable for any direct, indirect, incidental,
              consequential, or punitive damages arising out of your use or inability to use
              Kalkula-DataWatch.
            </li>
            <li>
              We do not guarantee the accuracy, completeness, or reliability of any content or
              information provided within the app.
            </li>
          </ol>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold">Privacy:</h2>
          <ol className="ml-4 list-disc">
            <li>
              Your privacy is important to us. Please refer to our Privacy Policy to understand how
              we collect, use, and protect your personal information.
            </li>
          </ol>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold">Termination:</h2>
          <ol className="ml-4 list-disc">
            <li>
              We may terminate or suspend your account and access to Kalkula-DataWatch at any time,
              without prior notice or liability, for any reason.
            </li>
          </ol>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold">Governing Law:</h2>
          <ol className="ml-4 flex list-decimal flex-col gap-3">
            <li>
              These Terms of Service shall be governed by and construed in accordance with the laws
              of the Republic of Indonesia.
            </li>
            <li>
              Any disputes arising out of or relating to these terms shall be subject to the
              exclusive jurisdiction of the courts in the Republic of Indonesia.
            </li>
          </ol>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold">Modifications:</h2>
          <ol className="ml-4 list-disc">
            <li>
              We reserve the right to modify or update these Terms of Service at any time. The
              revised terms will be effective upon posting within the app.
            </li>
          </ol>
        </div>
        <p>
          Please review these terms regularly. Your continued use of Kalkula-DataWatch constitutes
          acceptance of any modifications or updates to these Terms of Service.
        </p>
        <p>
          If you have any questions or concerns about these terms, please contact our support team.
          Thank you for using Kalkula-DataWatch and for agreeing to these Terms of Service.
        </p>
      </div>
    </LandingPageLayout>
  );
}
