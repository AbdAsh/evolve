import './default.scss';
function DefaultLayout(props) {
  return (
    <div id="default-layout">
      <header className='header'>
      </header>
      <section className="body-container">
        <div className="sidebar">
        </div>
        <main className="main-body">
          {props.body}
        </main>
      </section>
    </div>
  );
}

export default DefaultLayout;