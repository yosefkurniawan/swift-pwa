import Navigation from "../navigation";

const Layout = (Page, props) => {
  return class Layout extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const className =
        this.props.pageConfig && this.props.pageConfig.className
          ? " " + this.props.pageConfig.className
          : "";
      return (
        <div>
          <header></header>
          <main>
            <Page {...this.props} />
          </main>
          <footer>
            {
              <Navigation show={this.props.pageConfig.bottomNav} />
            }
          </footer>
        </div>
      );
    }
  };
};

export default Layout;
