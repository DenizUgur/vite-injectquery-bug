export const main = async () => {
  // Get the URL of the file in the bin folder
  const file = new URL("../bin/some.js", import.meta.url).href;

  // Suppose that was a big file and I want to track download progress
  const response = await fetch(file); // assume this handles progress

  // Now let's create a object URL for the file
  const blob = await response.arrayBuffer();
  const url = URL.createObjectURL(new Blob([blob], { type: "application/javascript" }));

  // Now let's see what happens when we fetch the object URL
  const objectResponse = await fetch(url);
  const objectBlob = await objectResponse.text();

  /**
   * Now you see that injectQuery import is prepended to the file
   * However, I don't want that to happen. Just want to get the file as it is.
   */
  console.log(objectBlob);
};

main()