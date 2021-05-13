import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
require("dotenv").config();

function Sidebar(props) {
  const history = useHistory();

  const handleRedirectToMain = () => {
    history.push("/");
  };

  return (
    <div id="sidebar">
      <div
        id="header-name"
        className="sidebar-header-name"
        onClick={handleRedirectToMain}
      >
        <span>Build Up</span>
      </div>
      <button className="sidebar-btn-back" onClick={handleRedirectToMain}>
        <FontAwesomeIcon icon={faHome} size="1x" className="icon" />
        &nbsp; 메인 페이지
      </button>
    </div>
  );
}

export default Sidebar;
