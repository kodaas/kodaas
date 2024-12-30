
import { BiLogoYoutube } from "react-icons/bi";
import YoutubeIframe from "../shared/YoutubeIframe";
import { getYoutubeId } from "@/app/utils";

// eslint-disable-next-line 
export function YoutubeWidget(props: any) {
  const { url } = props;
  const id = getYoutubeId(url);

  return (
    <div className="pt-1 relative">
      {url ? (
        <>
          {props.renderDefault(props)}
          <YoutubeIframe videoId={id} />
        </>
      ) : (
        <div className="flex items-center justify-center gap-x-2 my-3">
          <BiLogoYoutube className="text-[red] text-lg" />
          <span>Add YouTube URL</span>
        </div>
      )}
    </div>
  );
}
