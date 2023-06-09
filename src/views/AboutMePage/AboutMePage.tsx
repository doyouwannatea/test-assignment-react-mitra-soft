import ErrorStub from '@/components/ErrorStub';
import UserPostList from '@/components/UserPostList';
import { useDispatchOnMount } from '@/hooks/useDispatchOnMount';
import { getAllPosts } from '@/store/features/json-placeholder/sagas/posts';
import { useAppSelector } from '@/store/store';
import { Spinner, Stack } from 'react-bootstrap';

function AboutMePage() {
  const skillList = [
    'HTML',
    'CSS',
    'Figma',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'React',
    'Vue',
    'angular',
    'Frontend',
    'Git',
    'vite',
    'pinia',
    'REST_API',
  ];

  const { likedPosts, loading, error } = useAppSelector(
    ({ jsonPlaceholderReducer }) => jsonPlaceholderReducer,
  );

  useDispatchOnMount(
    getAllPosts({
      filter: likedPosts.map((postId) => ({
        option: 'id',
        value: String(postId),
      })),
    }),
  );

  return (
    <section>
      <h1>Булгатов Александр Андреевич</h1>
      <p>
        <b>Формат работы:</b> удалёнка, офис
      </p>
      <p>
        <b>Занятость:</b> полная
      </p>
      <p>
        <b>Ожидания по зарплате:</b> от 90 000 рублей
      </p>
      <p>
        <b>Опыт работы:</b> 1.5 года
        <ul className='list-inline mt-1'>
          <li>
            <b>Декабрь 2021 — По настоящее время:</b> vue разработчик
          </li>
          <li>
            <b>Июнь 2022 — Сентябрь 2022:</b> angular разработчик
          </li>
        </ul>
      </p>

      <section>
        <h4>Обо мне</h4>
        <p>
          Я занимаюсь frontend разработкой с конца 2019 года. В течение этого
          времени я работал верстальщиком на фрилансе, получил теоретические и
          практические навыки frontend разработки в Школе разработки интерфейсов
          Яндекса, а затем приступил к длительному проекту на Vue 3. Также у
          меня был опыт работы над крупным проектом на Angular в сфере ЖКХ.
        </p>
        <p>
          Последние 1.5 года занимаюсь разработкой SPA + REST API. Самый
          релевантный опыт на Vue 3, но я также работал над крупным проектом на
          Angular. Имею опыт в unit тестировании и документировании компонентов
          с помощью storybook. Могу рассмотреть любой предлагаемый Вами стек
          технологий и в дальнейшем развиваться в нём. Подробнее на{' '}
          <a
            href='https://hh.ru/resume/e3e641d4ff08a542180039ed1f46327245764c'
            target='_blank'
          >
            hh.ru
          </a>
        </p>
        <ul className='list-inline mt-1'>
          <li>
            mail:{' '}
            <a href='mailto:alexandr.bulgatov13@gmail.com'>
              alexandr.bulgatov13@gmail.com
            </a>
          </li>
          <li>
            telegram:{' '}
            <a href='https://t.me/doyouwannatea' target='_blank'>
              https://t.me/doyouwannatea
            </a>
          </li>
          <li>
            github:{' '}
            <a href='https://github.com/doyouwannatea/' target='_blank'>
              https://github.com/doyouwannatea/
            </a>
          </li>
          <li>
            hh.ru:{' '}
            <a
              href='https://hh.ru/resume/e3e641d4ff08a542180039ed1f46327245764c'
              target='_blank'
            >
              https://hh.ru/resume/e3e641d4ff08a542180039ed1f46327245764c
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h4>Навыки</h4>
        <Stack
          as='ul'
          className='list-inline flex-wrap'
          direction='horizontal'
          gap={2}
        >
          {skillList.map((skill) => (
            <li key={skill}>#{skill}</li>
          ))}
        </Stack>
      </section>

      <section>
        <h4>Лайкнутые посты</h4>
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorStub error={error} />
        ) : likedPosts.length === 0 ? (
          'Вы не лайкнули ни одного поста 😢'
        ) : (
          <UserPostList />
        )}
      </section>
    </section>
  );
}

export default AboutMePage;
