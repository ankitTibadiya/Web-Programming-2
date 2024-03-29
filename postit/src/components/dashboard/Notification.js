import React, { Component } from "react";
import moment from "moment";

class Notification extends Component {
  render() {
    const { notifications } = this.props;
    return (
      <div className="section">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">Notifications</span>
            <ul className="notifications">
              {notifications &&
                notifications.map(item => {
                  return (
                    <li key={item.id}>
                      <span className="blue-grey-text">{item.user} </span>
                      <span>{item.content}</span>
                      <div className="grey-text note-date">
                        {moment(item.time.toDate()).fromNow()}
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Notification;
