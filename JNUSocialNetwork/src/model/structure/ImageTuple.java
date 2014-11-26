package model.structure;

import java.util.HashMap;
import java.util.Map;

public class ImageTuple {
	private String originalImage;
	private String thumbnail;
	private String croppedImage;

	public ImageTuple() {
		this.originalImage = "";
		this.thumbnail = "";
		this.croppedImage = "";
	}

	public void setOriginalImaage(String originalImage) {
		this.originalImage = originalImage;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

	public void setCroppedImaage(String croppedImage) {
		this.croppedImage = croppedImage;
	}

	public Map<String, String> toTuple() {
		Map<String, String> tuple = new HashMap<String, String>();
		tuple.put("originalImage", this.originalImage);
		tuple.put("thumbnail", this.thumbnail);
		tuple.put("croppedImage", this.croppedImage);

		return tuple;
	}

}
