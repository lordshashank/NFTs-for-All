import classes from "@/styles/CreateNft.module.css";

const NftForm = ({
  file,
  setFile,
  values,
  setValues,
  submitHandler,
  isExtraFields,
}) => {
  const {
    title,
    description,
    traits,
    subscriptionPrice,
    subscriptionDuration,
    nftCount,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  return (
    <>
      <div className={classes["uploads-section"]}>
        <div className={classes["image-section"]}>
          <p>Upload your ART here, Please click "Upload Image" Button </p>
          <div className={classes["file-specifications"]}>
            Support JPG, PNG and <br /> MP4 videos. Max file size <br /> 10MB.
          </div>
          {file === null ? null : (
            <ul>
              <li className={classes.files}>
                <a
                  href={URL.createObjectURL(file)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {file.name}
                </a>
                <button
                  className={classes.close}
                  onClick={() => setFile(null)}
                ></button>
              </li>
            </ul>
          )}
          <div>
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              id="file-input"
              onChange={(event) => setFile(event.target.files[0])}
            />
            <label
              htmlFor="file-input"
              style={{ display: "block" }}
              className={classes["upload-btn"]}
            >
              Upload Image
            </label>
          </div>
          {/* <button className={classes["upload-btn"]}>Upload Image</button> */}
        </div>
        <div className={classes["details-section"]}>
          <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.col}>
              <label className={classes.label}>Art Title</label>
              <input
                className={classes["user-input"]}
                type="text"
                placeholder="Title:"
                value={title}
                onChange={handleChange("title")}
              ></input>
            </div>
            <div className={classes.col}>
              <label className={classes.label}>Description</label>
              <textarea
                className={classes["user-input"]}
                placeholder="Description:"
                value={description}
                onChange={handleChange("description")}
              />
            </div>
            <div className={classes.col}>
              <label className={classes.label}>Traits</label>
              <textarea
                className={classes["user-input"]}
                placeholder="traits:"
                value={traits}
                onChange={handleChange("traits")}
              />
            </div>
            {isExtraFields && (
              <>
                <div className={classes.row}>
                  <div className={classes.col}>
                    <label className={classes.label}>
                      Subscription Price(Matic)
                    </label>
                    <input
                      className={classes["user-input"]}
                      type="number"
                      placeholder="Price:"
                      value={subscriptionPrice}
                      onChange={handleChange("subscriptionPrice")}
                    ></input>
                  </div>
                  <div className={classes.col}>
                    <label className={classes.label}>
                      Subscription Duration(Days)
                    </label>
                    <input
                      className={classes["user-input"]}
                      type="number"
                      placeholder="Duration:"
                      value={subscriptionDuration}
                      onChange={handleChange("subscriptionDuration")}
                    ></input>
                  </div>
                </div>
                <div className={classes.col}>
                  <label className={classes.label}>
                    Number of Subscriptions
                  </label>
                  <input
                    className={classes["user-input"]}
                    type="number"
                    placeholder="Number of Subscriptions:"
                    value={nftCount}
                    onChange={handleChange("nftCount")}
                  ></input>
                </div>
              </>
            )}
            <button
              style={{ width: "fit-content", padding: "0.5rem 1.25rem" }}
              className={classes["upload-btn"]}
              type="submit"
            >
              Create Item
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NftForm;
