package transaction.DAOUpdateTransaction;

import java.util.Set;

import javax.persistence.EntityManager;

import model.Post;
import persistence.DAO;
import transaction.DAOTransaction;

public class AddPostImagesTransaction extends DAOTransaction {

	@SuppressWarnings("unchecked")
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Post post = dao.get(Post.class, params[0]);
		post.addImageLinks((Set<String>) params[1]);
		dao.update(post);
		return post.toRepresentation();
	}

}
