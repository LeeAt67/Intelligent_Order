import useTitle from "@/hooks/useTitle";
import styles from "./index.module.css";
const Profile = () => {
  useTitle("我的");
  return <div className={styles.profile}>Profile</div>;
};

export default Profile;
