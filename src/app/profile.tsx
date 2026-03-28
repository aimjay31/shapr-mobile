import { useThemeMode } from "@/context/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { nightMode, setNightMode, theme } = useThemeMode();
  const { bg, cardBg, textColor, subColor, borderColor, inputBg } = theme;

  const [view, setView] = useState("settings");

  // Profile state
  const [firstName, setFirstName] = useState("Jane");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("jane.doe@university.edu");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  // Settings state
  const [profilePublic, setProfilePublic] = useState(true);
  const [shareStats, setShareStats] = useState(false);
  const [allowNotifications, setAllowNotifications] = useState(true);
  const [dailyGoal, setDailyGoal] = useState("4");

  const handlePickPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission needed", "Please allow access to your photo library.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    Alert.alert("Success", "Changes saved successfully!");
    setView("settings");
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]}>

      {/* ===== SETTINGS VIEW ===== */}
      {view === "settings" && (
        <>
          <Text style={[styles.pageTitle, { color: textColor }]}>Settings</Text>

          {/* Profile Header Card */}
          <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
            <View style={styles.profileRow}>

              {/* Avatar with picker */}
              <TouchableOpacity onPress={handlePickPhoto} style={styles.avatarWrapper}>
                {photo ? (
                  <Image source={{ uri: photo }} style={styles.avatar} />
                ) : (
                  <View style={[styles.avatar, styles.avatarPlaceholder]}>
                    <Text style={styles.avatarInitials}>
                      {firstName.charAt(0)}{lastName.charAt(0)}
                    </Text>
                  </View>
                )}
                <View style={styles.avatarEditBadge}>
                  <Text style={styles.avatarEditIcon}>📷</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.profileInfo}>
                <Text style={[styles.profileName, { color: textColor }]}>
                  {firstName} {lastName}
                </Text>
                <Text style={[styles.profileRole, { color: subColor }]}>
                  Student • Computer Science
                </Text>
                <Text style={[styles.profileEmail, { color: subColor }]}>
                  {email}
                </Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>✦ Pro Member</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => setView("editProfile")}
            >
              <Text style={styles.editBtnText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Appearance Card */}
          <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
            <Text style={[styles.cardTitle, { color: textColor }]}>🎨 Appearance</Text>
            <View style={styles.toggleRow}>
              <View>
                <Text style={[styles.toggleLabel, { color: textColor }]}>Night Mode</Text>
                <Text style={[styles.toggleSub, { color: subColor }]}>
                  Switch between light and dark themes
                </Text>
              </View>
              <Switch
                value={nightMode}
                onValueChange={setNightMode}
                trackColor={{ true: "#7C5BD6", false: "#ddd8f0" }}
                thumbColor="#fff"
              />
            </View>
          </View>

          {/* Privacy & Security Card */}
          <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
            <Text style={[styles.cardTitle, { color: textColor }]}>🔒 Privacy & Security</Text>

            {[
              { label: "Make profile public", value: profilePublic, setter: setProfilePublic },
              { label: "Share study stats", value: shareStats, setter: setShareStats },
              { label: "Allow notifications", value: allowNotifications, setter: setAllowNotifications },
            ].map((item) => (
              <View
                key={item.label}
                style={[styles.toggleRow, { borderTopWidth: 1, borderTopColor: borderColor }]}
              >
                <Text style={[styles.toggleLabel, { color: textColor }]}>{item.label}</Text>
                <Switch
                  value={item.value}
                  onValueChange={item.setter}
                  trackColor={{ true: "#7C5BD6", false: "#ddd8f0" }}
                  thumbColor="#fff"
                />
              </View>
            ))}

            <TouchableOpacity style={styles.changePwBtn}>
              <Text style={styles.changePwText}>🔑 Change Password</Text>
            </TouchableOpacity>
          </View>

          {/* Other Settings Card */}
          <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
            <Text style={[styles.cardTitle, { color: textColor }]}>⚙️ Other Settings</Text>
            <Text style={[styles.fieldLabel, { color: subColor }]}>DAILY STUDY GOAL (HRS)</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, borderColor, color: textColor }]}
              value={dailyGoal}
              onChangeText={setDailyGoal}
              keyboardType="numeric"
              placeholder="4"
              placeholderTextColor={subColor}
            />
          </View>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={[styles.btnCancel, { borderColor }]}>
              <Text style={[styles.btnCancelText, { color: subColor }]}>Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
              <Text style={styles.btnSaveText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* ===== EDIT PROFILE VIEW ===== */}
      {view === "editProfile" && (
        <>
          <TouchableOpacity onPress={() => setView("settings")} style={styles.backBtn}>
            <Text style={[styles.backText, { color: "#7C5BD6" }]}>← Back to Settings</Text>
          </TouchableOpacity>

          <Text style={[styles.pageTitle, { color: textColor }]}>Edit Profile</Text>
          <Text style={[styles.editSubtitle, { color: subColor }]}>
            Update your personal information.
          </Text>

          <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>

            {/* Avatar picker in edit view */}
            <TouchableOpacity onPress={handlePickPhoto} style={styles.avatarEditCenter}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.avatarLarge} />
              ) : (
                <View style={[styles.avatarLarge, styles.avatarPlaceholder]}>
                  <Text style={styles.avatarInitialsLarge}>
                    {firstName.charAt(0)}{lastName.charAt(0)}
                  </Text>
                </View>
              )}
              <View style={styles.avatarEditBadgeLarge}>
                <Text style={styles.avatarChangeTxt}>📷 Change Photo</Text>
              </View>
            </TouchableOpacity>

            <Text style={[styles.fieldLabel, { color: subColor }]}>FIRST NAME</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, borderColor, color: textColor }]}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Jane"
              placeholderTextColor={subColor}
            />

            <Text style={[styles.fieldLabel, { color: subColor }]}>LAST NAME</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, borderColor, color: textColor }]}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Doe"
              placeholderTextColor={subColor}
            />

            <Text style={[styles.fieldLabel, { color: subColor }]}>EMAIL ADDRESS</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, borderColor, color: textColor }]}
              value={email}
              onChangeText={setEmail}
              placeholder="jane.doe@university.edu"
              placeholderTextColor={subColor}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={[styles.fieldLabel, { color: subColor }]}>SHORT BIO</Text>
            <TextInput
              style={[styles.input, styles.textarea, { backgroundColor: inputBg, borderColor, color: textColor }]}
              value={bio}
              onChangeText={setBio}
              placeholder="Tell us about your study goals..."
              placeholderTextColor={subColor}
              multiline
              numberOfLines={4}
            />

            <View style={styles.streakBadge}>
              <Text style={styles.streakLabel}>STUDY STREAK</Text>
              <Text style={styles.streakFire}>🔥</Text>
              <Text style={styles.streakVal}>12 days</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.btnCancel, { borderColor }]}
              onPress={() => setView("settings")}
            >
              <Text style={[styles.btnCancelText, { color: subColor }]}>Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
              <Text style={styles.btnSaveText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  pageTitle: { fontSize: 26, fontWeight: "800", marginTop: 50, marginBottom: 16 },

  card: {
    borderRadius: 16, padding: 18, marginBottom: 16,
    borderWidth: 1, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },

  // Avatar - settings view
  profileRow: { flexDirection: "row", gap: 14, marginBottom: 14 },
  avatarWrapper: { position: "relative", width: 72, height: 72 },
  avatar: { width: 72, height: 72, borderRadius: 36 },
  avatarPlaceholder: { backgroundColor: "#7C5BD6", justifyContent: "center", alignItems: "center" },
  avatarInitials: { color: "#fff", fontSize: 24, fontWeight: "800" },
  avatarEditBadge: {
    position: "absolute", bottom: -2, right: -2,
    backgroundColor: "#fff", borderRadius: 10, padding: 2,
  },
  avatarEditIcon: { fontSize: 12 },

  // Avatar - edit profile view
  avatarEditCenter: { alignItems: "center", marginBottom: 20 },
  avatarLarge: { width: 100, height: 100, borderRadius: 50 },
  avatarInitialsLarge: { color: "#fff", fontSize: 36, fontWeight: "800" },
  avatarEditBadgeLarge: {
    marginTop: 8, backgroundColor: "#7C5BD6",
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6,
  },
  avatarChangeTxt: { color: "#fff", fontWeight: "700", fontSize: 13 },

  profileInfo: { flex: 1 },
  profileName: { fontSize: 20, fontWeight: "800", marginBottom: 3 },
  profileRole: { fontSize: 13, marginBottom: 2 },
  profileEmail: { fontSize: 12, fontStyle: "italic" },

  badge: {
    backgroundColor: "#ede9fe", borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 3,
    alignSelf: "flex-start", marginTop: 6,
  },
  badgeText: { color: "#7C5BD6", fontSize: 11, fontWeight: "700" },

  editBtn: { backgroundColor: "#7C5BD6", borderRadius: 10, padding: 12, alignItems: "center" },
  editBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },

  cardTitle: { fontSize: 15, fontWeight: "700", marginBottom: 16 },
  toggleRow: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", paddingVertical: 12,
  },
  toggleLabel: { fontSize: 14, fontWeight: "600" },
  toggleSub: { fontSize: 11, fontStyle: "italic", marginTop: 2 },

  changePwBtn: {
    backgroundColor: "#ede9fe", borderRadius: 8,
    padding: 10, alignSelf: "flex-start", marginTop: 12,
  },
  changePwText: { color: "#7C5BD6", fontWeight: "700", fontSize: 13 },

  fieldLabel: {
    fontSize: 11, fontWeight: "600", letterSpacing: 1,
    textTransform: "uppercase", marginBottom: 8, marginTop: 4,
  },
  input: { borderWidth: 1.5, borderRadius: 10, padding: 12, fontSize: 14, marginBottom: 14 },
  textarea: { minHeight: 90, textAlignVertical: "top" },

  streakBadge: {
    flexDirection: "row", alignItems: "center", gap: 10,
    backgroundColor: "#ede9fe", borderRadius: 12, padding: 12, marginTop: 4,
  },
  streakLabel: { fontSize: 10, fontWeight: "800", color: "#7C5BD6", letterSpacing: 1 },
  streakFire: { fontSize: 16 },
  streakVal: { fontSize: 18, fontWeight: "800", color: "#1a1535" },

  footer: { flexDirection: "row", justifyContent: "flex-end", gap: 12, marginBottom: 40 },
  btnCancel: { borderWidth: 1.5, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 12 },
  btnCancelText: { fontWeight: "600", fontSize: 14 },
  btnSave: { backgroundColor: "#7C5BD6", borderRadius: 10, paddingHorizontal: 20, paddingVertical: 12 },
  btnSaveText: { color: "#fff", fontWeight: "700", fontSize: 14 },

  backBtn: { marginTop: 50, marginBottom: 8 },
  backText: { fontWeight: "600", fontSize: 14 },
  editSubtitle: { fontSize: 13, fontStyle: "italic", marginBottom: 16 },
});