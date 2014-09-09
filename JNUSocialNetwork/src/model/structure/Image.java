package model.structure;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import utils.RootPathHelper;

public class Image {
	private String src;
	private int height;
	private int width;

	public Image() {
	}

	public Image(String src, int height, int width) {
		this.setSrc(src);
		this.setHeight(height);
		this.setWidth(width);
	}

	public Image(String src) {
		try {
			this.src = src;
			src = RootPathHelper.getRootPath() + "pages/" + src;
			BufferedImage bi = ImageIO.read(new File(src));
			this.height = bi.getHeight();
			this.width = bi.getWidth();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public String getSrc() {
		return src;
	}

	public void setSrc(String src) {
		this.src = src;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

}
