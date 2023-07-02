import { Button } from '@/components/base/button';
import useSocmedShare from '@/services/features/analytic/hooks/use-socmed-share';
import { TwitterIcon, FacebookIcon, WhatsappIcon, LinkedinIcon } from '@/components/icons';

const SocmedShare = () => {
  const shareMutation = useSocmedShare();
  return (
    <div className="flex flex-wrap justify-between gap-y-5 text-sm md:flex-nowrap md:gap-5 md:text-base">
      <a
        href="https://twitter.com/intent/tweet?text=Empowering Data Analysis with Free: Experience Quality Insights with Kalkula - DataWatch! by Kedata&url=https://data-watch.kalkula.id"
        target="_blank"
        onClick={() => shareMutation.mutateAsync({ platform: 'twitter' })}
        className="w-1/2 pr-[10px] md:w-1/4 md:pr-0"
      >
        <Button.share
          className="w-full justify-center bg-[#00ACEE] hover:bg-[#00ACEE] hover:bg-opacity-80"
          IconStart={<TwitterIcon className="h-6 w-6" />}
        >
          Share
        </Button.share>
      </a>

      <a
        href="https://www.facebook.com/sharer/sharer.php?u=https://data-watch.kalkula.id"
        target="_blank"
        onClick={() => shareMutation.mutateAsync({ platform: 'facebook' })}
        className="w-1/2 pl-[10px] md:w-1/4 md:pl-0"
      >
        <Button.share
          className="w-full justify-center bg-[#3B5998] hover:bg-[#3B5998] hover:bg-opacity-80"
          IconStart={<FacebookIcon className="h-6 w-6" />}
        >
          Share
        </Button.share>
      </a>

      <a
        href="https://api.whatsapp.com/send?text=Empowering+Data+Analysis+with+Free%3A+Experience+Quality+Insights+with+Kalkula+-+DataWatch%21+by+Kedata+https%3A%2F%2Fdata-watch.kalkula.id&url=https%3A%2F%2Fdata-watch.kalkula.id"
        target="_blank"
        onClick={() => shareMutation.mutateAsync({ platform: 'whatsapp' })}
        className="w-1/2 pr-[10px] md:w-1/4 md:pr-0"
      >
        <Button.share
          className="w-full justify-center bg-[#2CB742] hover:bg-[#2CB742] hover:bg-opacity-80"
          IconStart={<WhatsappIcon className="h-6 w-6" />}
        >
          Share
        </Button.share>
      </a>

      <a
        href="https://www.linkedin.com/sharing/share-offsite/?url=https://data-watch.kalkula.id"
        target="_blank"
        onClick={() => shareMutation.mutateAsync({ platform: 'linkedin' })}
        className="w-1/2 pl-[10px] md:w-1/4 md:pl-0"
      >
        <Button.share
          className="w-full justify-center bg-[#2867B2] hover:bg-[#2867B2] hover:bg-opacity-80"
          IconStart={<LinkedinIcon className="h-6 w-6" />}
        >
          Share
        </Button.share>
      </a>
    </div>
  );
};

export default SocmedShare;
