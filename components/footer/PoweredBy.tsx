import Icon from "$store/components/ui/Icon.tsx";

export default function PoweredBy() {
  return (
    <span class="flex items-center gap-1 text-sm">
      Powered by{" "}
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
      </a>{" "}
      <a
        href="https://maeztra.com/"
        aria-label="powered by https://maeztra.com/"
        target="_blank"
      >
        <Icon id="maeztra" height={20} width={134} strokeWidth={0.01} />
      </a>
    </span>
  );
}
