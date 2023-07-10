import "./ListComponent.scss";
import noAvatar from "../assets/no-avatar.png";
function List({items, onDelete}) {
  return (
    <ul>
      {items.map((item,i) => {
        return (
          <li key={i}>
            <div className="main-info">
              <img src={item.avatar ?? noAvatar} alt="avatar" className="profile-image" />
              <span className="list-title">{item.title}</span>
              <span className="list-subtitle">{item.subtitle}</span>
            </div>
            <i className="fas fa-trash delete-icon" onClick={() => onDelete(item)} />
          </li>
        );
      })}
    </ul>
  );
}

export default List;
