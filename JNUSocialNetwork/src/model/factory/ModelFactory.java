package model.factory;

import model.ChatRoom;
import model.Comment;
import model.Community;
import model.CommunityOwner;
import model.God;
import model.Member;
import model.Message;
import model.Model;
import model.Post;
import model.ServerSentEvent;

public class ModelFactory {
	private static ModelFactory factory;
	
	public static ModelFactory getInstance() {
		if(factory == null) {
			synchronized(ModelFactory.class) {
				if(factory == null) {
					factory = new ModelFactory();
				}
			}
		}
		
		return factory;
	}
	@SuppressWarnings("unchecked")
	public <T extends Model> T create(Object...params) {
		Model model = null;
		if(params[0].equals(Member.class))
			model = new Member();
		if(params[0].equals(CommunityOwner.class))
			model = new CommunityOwner();
		if(params[0].equals(God.class))
			model = new God();
		if(params[0].equals(Community.class))
			model = new Community();
		if(params[0].equals(Post.class))
			model = new Post();
		if(params[0].equals(Comment.class))
			model = new Comment();
		if(params[0].equals(ChatRoom.class))
			model = new ChatRoom();
		if(params[0].equals(Message.class))
			model = new Message();
		if(params[0].equals(ServerSentEvent.class))
			model = new ServerSentEvent();
		
		Object[] p = new Object[params.length-1];
		for(int i=1;params!=null&i<params.length;i++)
			p[i-1] = params[i];
		model.init(p);
		
		return (T) model;
	}
}
