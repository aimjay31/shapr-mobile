// ============================================================
// DARK MODE SYSTEM - profile.tsx
// ============================================================
// This screen is where the user CONTROLS the night mode toggle.
// The toggle is under Settings > Appearance > Night Mode.
//
// HOW IT WORKS HERE:
// - `nightMode`    → the current on/off state (true = dark)
// - `setNightMode` → called by the Switch to toggle dark/light
// - `theme`        → the color object used for all styled elements
//
// Toggling the switch here instantly updates ALL other screens
// because the state lives in ThemeContext (global).
// ============================================================

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

// ✅ DARK MODE — import the hook to get nightMode state and theme colors
import { useThemeMode } from "@/context/ThemeContext";

export default function ProfileScreen() {
  // ✅ DARK MODE — nightMode = current toggle state, setNightMode = toggle function
  const { nightMode, setNightMode, theme } = useThemeMode();
  const { bg, cardBg, textColor, subColor, borderColor, inputBg } = theme;

  const [view, setView] = useState("settings");
  const [firstName, setFirstName] = useState("Jane");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("jane.doe@university.edu");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const [profilePublic, setProfilePublic] = useState(true);
  const [shareStats, setShareStats] = useState(false);
  const [allowNotifications, setAllowNotifications] = useState(true);

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
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const handleSave = () => {
    Alert.alert("Success", "Changes saved successfully!");
    setView("settings");
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            // TODO: Add your logout/navigation logic here
            // e.g. router.replace("/login");
            Alert.alert("Logged out", "You have been logged out.");
          },
        },
      ]
    );
  };

  // Reusable toggle row component
  const SettingRow = ({
    label,
    sub,
    value,
    onValueChange,
    isFirst,
  }: {
    label: string;
    sub?: string;
    value: boolean;
    onValueChange: (v: boolean) => void;
    isFirst?: boolean;
  }) => (
    <View style={[styles.settingRow, !isFirst && { borderTopWidth: 1, borderTopColor: borderColor }]}>
      <View style={styles.settingRowText}>
        <Text style={[styles.settingLabel, { color: textColor }]}>{label}</Text>
        {sub ? <Text style={[styles.settingSub, { color: subColor }]}>{sub}</Text> : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ true: "#7C5BD6", false: nightMode ? "#3a3a4a" : "#ddd8f0" }}
        thumbColor="#fff"
      />
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]} showsVerticalScrollIndicator={false}>

      {/* ===== SETTINGS VIEW ===== */}
      {view === "settings" && (
        <>
          <Text style={[styles.pageTitle, { color: textColor }]}>Settings</Text>

          {/* ── Profile Card ── */}
          <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
            <View style={styles.profileRow}>
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
                <View style={styles.cameraBtn}>
                  <Text style={{ fontSize: 10 }}>📷</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.profileInfo}>
                <Text style={[styles.profileName, { color: textColor }]}>{firstName} {lastName}</Text>
                <Text style={[styles.profileRole, { color: subColor }]}>Student · Computer Science</Text>
                <Text style={[styles.profileEmail, { color: subColor }]}>{email}</Text>
                <View style={styles.proBadge}>
                  <Text style={styles.proBadgeText}>✦ Pro Member</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.editBtn, { borderColor: "#7C5BD6", borderWidth: 1.5 }]}
              onPress={() => setView("editProfile")}
            >
              <Text style={styles.editBtnText}>✏️  Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* ── Appearance ── */}
          <Text style={[styles.sectionLabel, { color: subColor }]}>APPEARANCE</Text>
          <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
            <SettingRow
              label="Night Mode"
              sub="Switch between light and dark themes"
              value={nightMode}
              onValueChange={setNightMode}
              isFirst
            />
          </View>

          {/* ── Privacy & Security ── */}
          <Text style={[styles.sectionLabel, { color: subColor }]}>PRIVACY & SECURITY</Text>
          <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
            <SettingRow label="Public Profile" value={profilePublic} onValueChange={setProfilePublic} isFirst />
            <SettingRow label="Share Study Stats" value={shareStats} onValueChange={setShareStats} />
            <SettingRow label="Allow Notifications" value={allowNotifications} onValueChange={setAllowNotifications} />
            <TouchableOpacity style={[styles.textActionBtn, { borderTopColor: borderColor }]}>
              <Text style={styles.textActionBtnText}>🔑  Change Password</Text>
              <Text style={{ color: subColor, fontSize: 18 }}>›</Text>
            </TouchableOpacity>
          </View>

          {/* ── Account ── */}
          <Text style={[styles.sectionLabel, { color: subColor }]}>ACCOUNT</Text>

          {/* LOGOUT — no Discard/Save buttons here, just the logout */}
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <View style={{ height: 50 }} />
        </>
      )}

      {/* ===== EDIT PROFILE VIEW ===== */}
      {view === "editProfile" && (
        <>
          <TouchableOpacity onPress={() => setView("settings")} style={styles.backBtn}>
            <Text style={[styles.backText, { color: "#7C5BD6" }]}>← Back to Settings</Text>
          </TouchableOpacity>

          <Text style={[styles.pageTitle, { color: textColor }]}>Edit Profile</Text>
          <Text style={[styles.editSubtitle, { color: subColor }]}>Update your personal information.</Text>

          <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
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
              <View style={styles.changePhotoBadge}>
                <Text style={styles.changePhotoText}>📷  Change Photo</Text>
              </View>
            </TouchableOpacity>

            {[
              { label: "FIRST NAME", value: firstName, setter: setFirstName, placeholder: "Jane" },
              { label: "LAST NAME", value: lastName, setter: setLastName, placeholder: "Doe" },
              { label: "EMAIL ADDRESS", value: email, setter: setEmail, placeholder: "jane.doe@university.edu" },
            ].map((field) => (
              <View key={field.label}>
                <Text style={[styles.fieldLabel, { color: subColor }]}>{field.label}</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: inputBg, borderColor, color: textColor }]}
                  value={field.value}
                  onChangeText={field.setter}
                  placeholder={field.placeholder}
                  placeholderTextColor={subColor}
                />
              </View>
            ))}

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

            <View style={[styles.streakBadge, { backgroundColor: nightMode ? "#2a1f4a" : "#ede9fe" }]}>
              <Text style={styles.streakFire}>🔥</Text>
              <View>
                <Text style={[styles.streakLabel, { color: "#7C5BD6" }]}>STUDY STREAK</Text>
                <Text style={[styles.streakVal, { color: textColor }]}>12 days in a row</Text>
              </View>
            </View>
          </View>

          {/* Discard & Save — only shown in Edit Profile view */}
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
  container: { flex: 1, paddingHorizontal: 20 },
  pageTitle: { fontSize: 28, fontWeight: "800", marginTop: 55, marginBottom: 6 },
  sectionLabel: {
    fontSize: 11, fontWeight: "700", letterSpacing: 1.2,
    textTransform: "uppercase", marginBottom: 8, marginTop: 20, marginLeft: 4,
  },
  card: {
    borderRadius: 16, borderWidth: 1,
    overflow: "hidden", marginBottom: 4,
    shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, elevation: 2,
  },

  // Profile
  profileRow: { flexDirection: "row", gap: 14, padding: 18, paddingBottom: 14 },
  avatarWrapper: { position: "relative", width: 72, height: 72 },
  avatar: { width: 72, height: 72, borderRadius: 36 },
  avatarPlaceholder: { backgroundColor: "#7C5BD6", justifyContent: "center", alignItems: "center" },
  avatarInitials: { color: "#fff", fontSize: 24, fontWeight: "800" },
  cameraBtn: {
    position: "absolute", bottom: 0, right: 0,
    backgroundColor: "#fff", borderRadius: 12, padding: 4,
    shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 4, elevation: 3,
  },
  profileInfo: { flex: 1, justifyContent: "center" },
  profileName: { fontSize: 18, fontWeight: "800", marginBottom: 2 },
  profileRole: { fontSize: 12, marginBottom: 2 },
  profileEmail: { fontSize: 12, fontStyle: "italic", marginBottom: 6 },
  proBadge: {
    backgroundColor: "#ede9fe", borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 3, alignSelf: "flex-start",
  },
  proBadgeText: { color: "#7C5BD6", fontSize: 11, fontWeight: "700" },
  editBtn: {
    marginHorizontal: 18, marginBottom: 16,
    borderRadius: 12, padding: 12, alignItems: "center",
    backgroundColor: "transparent",
  },
  editBtnText: { color: "#7C5BD6", fontWeight: "700", fontSize: 14 },

  // Setting rows
  settingRow: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", paddingVertical: 14, paddingHorizontal: 18,
  },
  settingRowText: { flex: 1, marginRight: 12 },
  settingLabel: { fontSize: 15, fontWeight: "600" },
  settingSub: { fontSize: 12, marginTop: 2 },
  textActionBtn: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", paddingVertical: 14, paddingHorizontal: 18,
    borderTopWidth: 1,
  },
  textActionBtnText: { color: "#7C5BD6", fontWeight: "700", fontSize: 14 },

  // Logout
  logoutBtn: {
    borderRadius: 14, padding: 16,
    alignItems: "center", marginTop: 4,
    backgroundColor: "#ff4444",
  },
  logoutText: { color: "#fff", fontWeight: "800", fontSize: 15, letterSpacing: 0.5 },

  // Edit profile
  avatarEditCenter: { alignItems: "center", paddingVertical: 20 },
  avatarLarge: { width: 100, height: 100, borderRadius: 50 },
  avatarInitialsLarge: { color: "#fff", fontSize: 36, fontWeight: "800" },
  changePhotoBadge: {
    marginTop: 10, backgroundColor: "#7C5BD6",
    borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7,
  },
  changePhotoText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  fieldLabel: {
    fontSize: 11, fontWeight: "700", letterSpacing: 1,
    textTransform: "uppercase", marginBottom: 6,
    marginTop: 2, paddingHorizontal: 18,
  },
  input: {
    borderWidth: 1.5, borderRadius: 12,
    padding: 13, fontSize: 14,
    marginBottom: 14, marginHorizontal: 18,
  },
  textarea: { minHeight: 90, textAlignVertical: "top" },
  streakBadge: {
    flexDirection: "row", alignItems: "center", gap: 12,
    borderRadius: 12, padding: 14, margin: 18, marginTop: 4,
  },
  streakFire: { fontSize: 28 },
  streakLabel: { fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  streakVal: { fontSize: 16, fontWeight: "700", marginTop: 2 },

  // Footer — only in Edit Profile
  footer: { flexDirection: "row", justifyContent: "flex-end", gap: 12, marginBottom: 40, marginTop: 8 },
  btnCancel: { borderWidth: 1.5, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 13 },
  btnCancelText: { fontWeight: "600", fontSize: 14 },
  btnSave: { backgroundColor: "#7C5BD6", borderRadius: 12, paddingHorizontal: 24, paddingVertical: 13 },
  btnSaveText: { color: "#fff", fontWeight: "700", fontSize: 14 },

  backBtn: { marginTop: 55, marginBottom: 8 },
  backText: { fontWeight: "600", fontSize: 14 },
  editSubtitle: { fontSize: 13, marginBottom: 16 },
});