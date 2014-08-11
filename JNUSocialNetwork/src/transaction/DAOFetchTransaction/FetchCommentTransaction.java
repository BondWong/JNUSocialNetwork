package transaction.DAOFetchTransaction;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManager;

import model.Comment;
import persistence.DAO;
import transaction.DAOTransaction;

public class FetchCommentTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Map<String, Object> result = new HashMap<String, Object>();
		Comment comment = dao.singleRead("Comment.fetchByID", Comment.class,
				params);
		if (comment != null)
			result = comment.toRepresentation();
		return result;
	}

}
