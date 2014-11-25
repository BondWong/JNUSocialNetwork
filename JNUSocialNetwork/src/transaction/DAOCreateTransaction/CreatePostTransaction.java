package transaction.DAOCreateTransaction;

import helper.serviceHelper.searchHelper.RankMap;

import javax.persistence.EntityManager;

import persistence.DAO;
import model.Member;
import model.Post;
import model.factory.ModelFactory;
import transaction.DAOTransaction;
import utils.ConstantValue;

public class CreatePostTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Member member = dao.get(Member.class, params[0]);
		Post post = ModelFactory.getInstance().create(Post.class, params[1],
				params[2], params[3], params[4]);
		member.createPost(post);
		dao.update(member);
		RankMap.deserialize();
		RankMap.addLonlinessRankRecord(member.getID(), ConstantValue.POSTWEIGHT);
		RankMap.serialize();
		return post.toRepresentation();
	}

}
