import React, { Component } from "react";

class CommenArea extends Component {
  render() {
    return (
      <div>
        {/* это сложная логика только чтобы выглядело красиво, обрабатывает случаи когда в базе вместо коментов null или пробелы */}
        {this.props.Items.comment.length === 0 ? "-" : this.props.Items.comment}
      </div>
    );
  }
}

export default CommenArea;
