const Notification = ({ message, error }) => {
    if (message === "") {
      return null;
    } else {
        if (error) {
            return <div className="error">{message}</div>;
          } else {
            return <div className="success">{message}</div>;
          }
    }
  

  };
  
  export default Notification;
  