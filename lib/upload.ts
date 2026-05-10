import { supabase } from "./supabase";

export async function uploadSound(file: File) {
  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
  .from("sounds")
  .upload(fileName, file);

  if (error) {
    console.error(error);
    return null;
  }

  const { data: publicUrl } = supabase.storage
  .from("sounds")
  .getPublicUrl(fileName);

  return publicUrl.publicUrl;
}

/* export async function uploadSound( file: File, title: string ) {
  try {
    const fileName = `${Date.now()}-${file.name}`;

    // upload file to storage
    const { error: uploadError } = await supabase.storage
    .from("sounds")
    .upload(fileName, file);

    if (uploadError) {
      throw uploadError;
    }

    // get public url
    const { data } = supabase.storage
    .from("sounds")
    .getPublicUrl(fileName);

    const audioUrl = data.publicUrl;

    // save into database
    const { error: dbError } = await supabase
    .from("sounds")
    .insert({
      title,
      audio_url: audioUrl,
      category: "meme",
    });

    if (dbError) {
      throw dbError;
    }

    return {
      success: true,
      url: audioUrl,
    };

  } catch (error) {
    console.error(error);
    return {
      success: false,
    };
  }
} */