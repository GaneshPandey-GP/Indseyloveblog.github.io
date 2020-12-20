import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import CollectionsIcon from "@material-ui/icons/Collections";
import { updateSection, updateSection4Admin, useAuthState } from "../../context";
import AddSection from "./AddSection";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));


export default function UpdateSection({createdBy}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const level = localStorage.getItem("user.level");
  const [{ sections }] = useAuthState();
  const handleClick = (event) => {
    if (sections.length !== 0) setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="default"
        startIcon={<CollectionsIcon />}
        onClick={handleClick}
      >
        {sections.length === 0 ? "No sections" : "Sections"}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {sections.map(({ section, sectionid }) => (
            <div key={sectionid}>
                <AddSection text={section} section={section} title={"Update section"} sectionid={sectionid} updateSection={level === 1 ? updateSection : updateSection4Admin} createdBy={createdBy}/>
            </div>
          
        ))}
      </StyledMenu>
    </div>
  );
}
