package transaction.DAOCreateTransaction;

import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import persistence.DAO;
import model.Community;
import model.Member;
import model.Post;
import model.Tag;
import model.factory.ModelFactory;
import model.modelType.PostType;
import service.helper.ActivitySearchMap;
import transaction.DAOTransaction;

public class CreatePostInCommunityTransaction extends DAOTransaction {

	@SuppressWarnings({ "unchecked" })
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Member user = dao.get(Member.class, params[0]);
		Community community = dao.get(Community.class, params[1]);
		Post post = ModelFactory.getInstance().create(Post.class, params[2],
				params[3], params[4]);
		List<String> tags = (List<String>) params[5];
		for (String t : tags) {
			Tag tag = dao.get(Tag.class, t);
			if (tag == null)
				tag = ModelFactory.getInstance().create(Tag.class, t);
			post.addActivityTypeTag(tag);
		}
		user.createPost(community, post);
		dao.update(community);
		if (params[2].equals(PostType.ACTIVITY)) {
			ActivitySearchMap.deserialize();
			ActivitySearchMap.addRecord(post.getID(), Long
					.parseLong((String) ((Map<String, Object>) params[3])
							.get("remindDate")));
			ActivitySearchMap.serialize();
		}

		return post.toRepresentation();
	}

}
