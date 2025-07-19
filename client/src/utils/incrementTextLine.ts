export const incrementLines = (
  currentWordDiv: HTMLDivElement,
  wordsContainerDiv: HTMLDivElement,
  refContainer: HTMLDivElement
) => {
  const containerTop = refContainer.getBoundingClientRect().top;
  const wordTop = currentWordDiv.getBoundingClientRect().top;
  const relativeTop = wordTop - containerTop;

  const lineHeight = 30;
  const currentLine = Math.floor(relativeTop / lineHeight);

  if (currentLine >= 4) {
    const currentMargin =
      parseFloat(wordsContainerDiv.style.marginTop || '0') || 0;
    const newMargin = currentMargin - lineHeight;
    wordsContainerDiv.style.marginTop = `${newMargin}px`;
  }
};
