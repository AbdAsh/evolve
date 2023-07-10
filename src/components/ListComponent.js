import './ListComponent.scss';
import noAvatar from '../assets/no-avatar.png';
function List({ items, onDelete }) {
  return (
    <ul className="px-0 ">
      {items &&
        items.length &&
        items.map((item, i) => {
          return (
            <li key={i} className="pt-2">
              <div className="main-info overflow-hidden">
                <img
                  src={item.avatar || noAvatar}
                  alt="avatar"
                  className="profile-image"
                />
                <span className="list-title">{item.first_name} {item.last_name}</span>
                <span className="list-subtitle">{item.subtitle ?? "No offical title"}</span>
              </div>
              <i
                className="fas fa-trash p-2 delete-icon"
                onClick={() => onDelete(item)}
              />
            </li>
          );
        })}
    </ul>
  );
}

export default List;
