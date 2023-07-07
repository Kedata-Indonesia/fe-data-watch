import Image from 'next/image';
import { LandingPageLayout } from '@/components/layouts';

export default function PrivacyPolicy() {
  return (
    <LandingPageLayout>
      {/* Hero */}
      <div className="relative flex flex-col items-center px-5 pb-[10px] pt-5 md:flex-row lg:px-0 lg:pt-[60px]">
        <div className="absolute right-0 top-0 hidden h-[100%] w-[27%] bg-c-red-50 md:block"></div>
        <div className="mb-10 lg:ml-[10%] lg:w-5/12">
          <h1 className="text-2xl font-bold text-c-red-600 lg:text-[54px]">Privacy Policy</h1>
          <p className="text-[20px] font-bold">
            Learn more about how Kalkula-DataWatch collects and uses data and your rights as an
            user.
          </p>
        </div>
        <div className="relative h-[325px] w-full lg:h-[425px] lg:w-7/12">
          <Image
            alt="privacy policy"
            src="/images/aggrement/privacy-policy.png"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto mb-[50px] mt-5 flex max-w-[655px] flex-col gap-y-[40px] px-5 lg:mt-[70px] lg:px-0">
        <p>
          At Kedata Indonesia Digital, we are committed to protecting your privacy and ensuring the
          security of your personal information. This Privacy Policy outlines how we collect, use,
          and protect the data you provide when using our Kalkula-DataWatch application.
        </p>
        <div>
          <h2 className="mb-4 text-lg font-bold">Information We Collect:</h2>
          <ol className="ml-4 flex list-decimal flex-col gap-3">
            <li>
              Personal Information: When you register an account or use our app, we may collect
              personal information such as your name, email address, and other contact details.
            </li>
            <li>
              Usage Data: We may collect anonymous usage data, including log files, device
              information, and analytics, to improve our app's performance and enhance user
              experience.
            </li>
          </ol>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold">Use of Information:</h2>
          <ol className="ml-4 flex list-decimal flex-col gap-3">
            <li>
              Personalization: We may use your information to personalize your experience within the
              app, providing tailored content, features, and recommendations.
            </li>
            <li>
              Communication: We may use your contact information to send you important updates,
              notifications, and relevant marketing communications.
            </li>
            <li>
              Analytics: We may analyze the collected data to gain insights into app usage patterns,
              trends, and user behavior, helping us improve our services.
            </li>
          </ol>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold">Data Protection:</h2>
          <ol className="ml-4 flex list-decimal flex-col gap-3">
            <li>
              Security Measures: We implement industry-standard security measures to safeguard your
              personal information from unauthorized access, loss, or alteration.
            </li>
            <li>
              Data Sharing: We do not sell, trade, or rent your personal information to third
              parties. However, we may share data with trusted service providers who assist us in
              app-related operations.
            </li>
            <li>
              Legal Compliance: We may disclose your information if required by law, to enforce our
              policies, or to protect the rights, property, or safety of our users or others.
            </li>
          </ol>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold">User Rights:</h2>
          <ol className="ml-4 flex list-decimal flex-col gap-3">
            <li>
              Access and Correction: You have the right to access, modify, or delete your personal
              information stored in our app. You can update your account settings or contact our
              support team for assistance.
            </li>
            <li>
              Data Retention: We retain your personal information as long as necessary to fulfill
              the purposes outlined in this Privacy Policy or as required by law.
            </li>
            <li>
              Opt-Out: You can choose to opt out of receiving promotional communications from us by
              following the unsubscribe instructions provided in our emails.
            </li>
          </ol>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold">Third-Party Links:</h2>
          <ol className="ml-4 list-disc">
            <li>
              Our app may contain links to third-party websites or services that have their own
              privacy policies. We are not responsible for the privacy practices or content of these
              external sites.
            </li>
          </ol>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold">Children's Privacy:</h2>
          <ol className="ml-4 list-disc">
            <li>
              Our app is not intended for children under the age of 13. We do not knowingly collect
              personal information from children. If we become aware that we have inadvertently
              collected information from a child, we will promptly delete it.
            </li>
          </ol>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold">Updates to the Privacy Policy:</h2>
          <ol className="ml-4 list-disc">
            <li>
              We may update this Privacy Policy periodically. Any changes will be effective upon
              posting the revised policy in the app. We recommend reviewing this policy regularly.
            </li>
          </ol>
        </div>
        <p>
          By using our Kalkula-DataWatch application, you signify your acceptance of this Privacy
          Policy. If you have any questions or concerns regarding our privacy practices, please
          contact our support team.
        </p>
        <p>
          Thank you for trusting us with your personal information and for choosing{' '}
          <span className="font-bold">Kedata Indonesia Digital.</span>
        </p>
      </div>
    </LandingPageLayout>
  );
}
