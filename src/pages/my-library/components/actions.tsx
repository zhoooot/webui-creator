import { Icon } from "@iconify/react";
import Link from "next/link";

type ActionProps = {
  qid: string;
  author: boolean;
  favorite: boolean;
  onClickFavorite: () => void;
  onClickDelete: () => void;
  onClickShare: () => void;
  onClickRename: () => void;
  onClickDuplicate: () => void;
};

const Action: React.FC<ActionProps> = (props) => {
  const buttonClass =
    "h-full border-0 font-medium rounded-full text-sm p-0 text-center inline-flex items-center p-1";
  const iconClass = "w-full h-full fill-current stroke-current";
  const subiconClass = "stroke-current stroke-10 mr-3 text-2xl";
  const optionClass =
    "dropdown-item text-black flex flex-row items-center text-lg h-10";

  return (
    <div className="flex flex-row content-center items-center justify-between h-full">
      <button
        type="button"
        className={`${
          props.author ? "text-inherit" : "text-gray-300"
        } hover:text-primary-400 ${buttonClass}`}
        disabled={!props.author}
        onClick={props.onClickDelete}
      >
        <Link href={`/create/${props.qid}`} className="w-full h-full">
        <Icon icon="majesticons:edit-pen-2-line" className={`${iconClass}`} />
        <span className="sr-only">Icon description</span>
        </Link>
      </button>
      <button
        type="button"
        className={`${
          props.favorite ? "text-yellow-500" : "text-inherit"
        } hover:text-yellow-400 ${buttonClass}`}
        onClick={props.onClickFavorite}
      >
        {props.favorite ? (
          <Icon
            icon="ant-design:star-filled"
            className={`w-full h-full fill-yellow-400 stroke-yellow-400 `}
          />
        ) : (
          <Icon
            icon="ant-design:star-outlined"
            className={`w-full h-full fill-current stroke-current`}
          />
        )}
        <span className="sr-only">Icon description</span>
      </button>
      <div className="dropdown h-full min-h-0">
        <label className="w-full min-h-0 h-full" tabIndex={0}>
          <button
            type="button"
            className={`${buttonClass} hover:text-gray-500`}
          >
            <Icon
              icon="lucide:more-vertical"
              className={`${iconClass}`}
            />
          </button>
        </label>
        <div
          className="dropdown-menu dropdown-menu-bottom-left z-50 w-40 "
          tabIndex={-1}
        >
          <a className={optionClass} onClick={props.onClickShare}>
            <Icon icon="lucide:share-2" className={`${subiconClass}`} />
            Share
          </a>
          <a className={optionClass} onClick={props.onClickDuplicate}>
            <Icon icon="lucide:copy" className={`${subiconClass}`} />
            Duplicate
          </a>
          {props.author ? (
            <a className={optionClass} onClick={props.onClickRename}>
              <Icon
                icon="lucide:arrow-right-from-line"
                className={`${subiconClass}`}
              />
              Rename
            </a>
          ) : (
            <a className={optionClass}>
              <Icon icon="lucide:flag" className={`${subiconClass}`} />
              Report
            </a>
          )}
          {props.author ? (
            <a className={optionClass}>
              <Icon
                icon="lucide:trash-2"
                className={`${subiconClass}`}
              />
              Delete
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Action;
