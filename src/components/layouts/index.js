import Navigation from "../navigation";

const Layout = (Page, props) => {
  return class Layout extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div>
          <header>
            <title>{this.props.pageConfig.title}</title>
          </header>
          <main>
            <Page {...this.props} />
          </main>
          <footer>
            {<Navigation show={this.props.pageConfig.bottomNav} />}
          </footer>
        </div>
      );
    }
  };
};

export default Layout;