import './default.scss';
function DefaultLayout(props) {
  return (
    <div id="default-layout">
      <header className='header'>
          This is header
      </header>
      <section className="body-container">
        <div className="sidebar">
          This is sidebar
        </div>
        <main className="main-body">
          {props.body}
        </main>
      </section>
    </div>
  );
}

export default DefaultLayout;