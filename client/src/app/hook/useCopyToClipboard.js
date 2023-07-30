import React from "react";

function useCopyToClipboard() {
  const [isCopied, setIsCopied] = React.useState(false);

  const copy = React.useCallback((text) => {
    if (typeof text !== "string") {
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
      })
      .catch((err) => {
        console.log("Error copy text: ", err);
      });
  }, [isCopied]);

  React.useEffect(() => {
    if (isCopied) {
      const time = setTimeout(() => {
        setIsCopied(false);
      }, 3000);

      return () => {
        clearTimeout(time);
      };
    }
  }, [isCopied]);

  return { isCopied, copy };
}

export default useCopyToClipboard;
