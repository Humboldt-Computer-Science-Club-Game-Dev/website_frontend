function Error({ reason }: any) {
  return (
    <>
      <h1>Error!</h1>
      <h4>This is our fault. Sorry for the inconvenience.</h4>
      <p>{reason}</p>
    </>
  );
}

export default Error;
