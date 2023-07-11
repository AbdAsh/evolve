// Importing the component's styles
import './ListComponent.scss';

// Importing the default avatar image
import noAvatar from '../assets/no-avatar.png';

// Defining the List component
function List({ items, onDelete }) {
  return (
    // Creating an unordered list
    <ul className="px-0 ">
      {items &&
        items.length &&
        // Mapping through the items array and rendering a list item for each item
        items.map((item, i) => {
          return (
            <li key={i} className="pt-2">
              <div className="main-info overflow-hidden">
                {/* Rendering the item's avatar image or the default avatar image */}
                <img
                  src={item.avatar || noAvatar}
                  alt="avatar"
                  className="profile-image"
                />
                {/* Rendering the item's first and last name */}
                <span className="list-title">{`${item.first_name} ${item.last_name}`}</span>
                {/* Rendering the item's subtitle or a default subtitle */}
                <span className="list-subtitle">{item.subtitle ?? "No offical title"}</span>
              </div>
              {/* Rendering a delete icon that calls the onDelete function when clicked */}
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

// Exporting the List component as the default export of the module
export default List;
