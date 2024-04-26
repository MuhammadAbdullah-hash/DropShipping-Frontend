import PropTypes from "prop-types";
import clsx from "clsx";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("welcome-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Who Are We</h5>
          <h1>Welcome To RubyPets</h1>
          <p>
            Introducing RubyPets, the ultimate e-commerce app for pet lovers!
            RubyPets offers a vast and 
            diverse selection of pets and their related products, providing a one-stop destination for all 
            your furry, feathered, or scaly companion needs. From adorable puppies and kittens to exotic 
            birds and reptiles, PetPal connects you with reputable breeders and shelters, ensuring the 
            well-being of every pet. Explore a curated marketplace filled with high-quality pet food, toys, 
            grooming essentials, and fashionable accessories. With user-friendly navigation, expert advice,
            and a seamless adoption process, PetPal is your trusted partner in creating a loving and 
            enriching environment for your beloved pets. Shop, adopt, and pamper your pets with RubyPets 
            today!
          {" "}
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleWithText;
