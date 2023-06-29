import Icon from "$store/components/ui/Icon.tsx";

export default function PoweredBy() {
  return (
    <span class="flex items-start gap-1 text-sm  flex-wrap">
      <div className="flex flex-col items-start">
        <p class="flex 	">
          Powered by
        </p>
        <a
          href="https://vtex.com/"
          aria-label="powered by https://vtex.com/"
          target="_blank"
        >
          <Icon
            id="vtex"
            height={42}
            width={118}
            strokeWidth={0.01}
            class="scale-[80%]"
          />
        </a>
      </div>
      <div className="flex flex-col items-start">
        <p class="flex	">
          Developed by
        </p>
        <a
          href="https://maeztra.com/"
          aria-label="powered by https://maeztra.com/"
          target="_blank"
        >
          <Icon
            id="maeztra"
            height={20}
            width={134}
            strokeWidth={0.01}
            class="mt-[11px]"
          />
        </a>
      </div>
    </span>
  );
}
