package model.factory;

import java.util.HashMap;
import java.util.Map;

import utils.DateTimeUtil;
import model.ChatRoom;
import model.Comment;
import model.Community;
import model.Member;
import model.Message;
import model.Post;
import model.ServerSentEvent;
import model.modelType.PostType;

public class AttributesFactory {
	private static AttributesFactory factory;
	
	public static AttributesFactory getInstance() {
		if(factory == null) {
			synchronized(AttributesFactory.class) {
				if(factory == null) {
					factory = new AttributesFactory();
				}
			}
		}
		
		return factory;
	}
	@SuppressWarnings("unchecked")
	public Map<String, String> create(Object... params) {
		Map<String, String> attributes = new HashMap<String, String>();
		if(params!=null&&params.length>0){
			Map<String, String> paramAttributes = (Map<String, String>) params[params.length-1];
			if(params[0].equals(Member.class)) {
				attributes.put("avatarLink", "");
				attributes.put("profileImageLink", "");
				attributes.put("gender", "");
				attributes.put("nickName", "");
				attributes.put("lookingFor", "");
				attributes.put("relationship", "");
				attributes.put("institution", "");
				attributes.put("major", "");
				attributes.put("telnum", "");
				attributes.put("email", "");
				attributes.put("birthday", "");
				attributes.put("campus", "");
				attributes.put("dorm", "");
				attributes.put("regDate", DateTimeUtil.getCurrnetDateTime());
			}
			if(params[0].equals(Post.class)&&params[1].equals(PostType.ACTIVITY)) {
				attributes.put("topic", "");
				attributes.put("content", "");
				attributes.put("startDate", "");
			}
			if(params[0].equals(Post.class)&&params[1].equals(PostType.NORMAL)) {
				attributes.put("topic", "");
				attributes.put("content", "");
			}
			if(params[0].equals(Community.class)) {
				attributes.put("name", "");
				attributes.put("introduce", "");
				attributes.put("foundDate", DateTimeUtil.getCurrnetDateTime());
			}
			if(params[0].equals(Comment.class)) {
				attributes.put("content", "");
			}
			if(params[0].equals(ChatRoom.class)) {
			}
			if(params[0].equals(Message.class)) {
				attributes.put("content", "");
			}
			if(params[0].equals(ServerSentEvent.class)) {}
			
			attributes.putAll(paramAttributes);
		}
		
		return attributes;
	}
}
