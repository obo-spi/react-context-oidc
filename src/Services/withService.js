export default (WrappedComponent, Services) => props => {
  return <WrappedComponent {...props} {...Services} />;
};
